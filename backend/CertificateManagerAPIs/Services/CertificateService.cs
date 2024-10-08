using CertificateManagerAPIs.DTO;
using CertificateManagerAPIs.Entities;

namespace CertificateManagerAPIs.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;
        public CertificateService(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }
        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            var certificates = await _certificateRepository.GetCertificatesAsync();

            return certificates.Select(c => new CertificateDto
            {
                Supplier = new SupplierDto
                {
                    SupplierName = c.Supplier.SupplierName,
                    SupplierId = c.Supplier.SupplierId,
                    SupplierIndex = c.Supplier.SupplierIndex,
                    City = c.Supplier.City
                },
                Type = c.Type,
                ValidFrom = c.ValidFrom,
                ValidTo = c.ValidTo,
                Id = c.Id
            });
        }
        public async Task<CertificateByIdDto?> GetCertificateByIdAsync(int id)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(id);
            if (certificate == null) return null;

            return new CertificateByIdDto
            {
                Supplier = new SupplierDto
                {
                    SupplierName = certificate.Supplier.SupplierName,
                    SupplierId = certificate.Supplier.SupplierId,
                    SupplierIndex = certificate.Supplier.SupplierIndex,
                    City = certificate.Supplier.City
                },
                Type = certificate.Type,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                PdfFile = certificate.PdfFile,
                Id = certificate.Id,
                Comments = certificate.Comments?.Select(c => new CommentDto
                {
                    Id = c.Id,
                    CertificateId = c.CertificateId,
                    UserId = c.UserId,
                    UserComment = c.UserComment
                }).ToList(),

                UserAssignedNavigation = certificate.AssignedUsers?.Select(au => new AssignedUserDto
                {
                    CertificateId = au.CertificateId,
                    UserId = au.UserId,
                    User = au.User != null ? new UserDto
                    {
                        Name = au.User.Name,
                        Email = au.User.Email,
                        Department = au.User.Department
                    } : null
                }).ToList()
            };
        }

        public async Task CreateCertificateAsync(CertificateCreateDto dto)
        {
            byte[]? pdfBytes = null;
            if (dto.PdfFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await dto.PdfFile.CopyToAsync(memoryStream);
                    pdfBytes = memoryStream.ToArray();
                }
            }

            var certificate = new Certificate
            {
                Type = dto.Type,
                ValidFrom = dto.ValidFrom,
                ValidTo = dto.ValidTo,
                PdfFile = pdfBytes,
                SupplierId = dto.SupplierId,
                AssignedUsers = new List<AssignedUser>()
            };

            if (dto.AssignedUserIds != null && dto.AssignedUserIds.Any())
            {
                foreach (var userId in dto.AssignedUserIds)
                {
                    certificate.AssignedUsers.Add(new AssignedUser
                    {
                        UserId = int.Parse(userId)
                    });
                }
            }

            await _certificateRepository.AddCertificateAsync(certificate);
            await _certificateRepository.SaveChangesAsync();
        }

        public async Task UpdateCertificateAsync(int id, CertificateUpdateDto dto)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(id);
            if (certificate == null)
                throw new Exception("Certificate not found");

            certificate.Type = dto.Type;
            certificate.ValidFrom = dto.ValidFrom;
            certificate.ValidTo = dto.ValidTo;
            certificate.SupplierId = dto.SupplierId;

            if (dto.PdfFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await dto.PdfFile.CopyToAsync(memoryStream);
                    certificate.PdfFile = memoryStream.ToArray();
                }
            }
            if (dto.NewComments != null)
            {
                foreach (var commentDto in dto.NewComments)
                {
                    var newComment = new Comment
                    {
                        CertificateId = certificate.Id,
                        UserId = commentDto.UserId,
                        UserComment = commentDto.UserComment
                    };
                    certificate.Comments.Add(newComment);
                }
            }

            if (dto.AssignedUserIds != null)
            {
                certificate.AssignedUsers.Clear();
                foreach (var userId in dto.AssignedUserIds)
                {
                    var newAssignedUser = new AssignedUser
                    {
                        UserId = userId,
                        CertificateId = certificate.Id
                    };
                    certificate.AssignedUsers.Add(newAssignedUser);
                }
            }

            await _certificateRepository.UpdateCertificateAsync(certificate);
            await _certificateRepository.SaveChangesAsync();
        }
        public async Task DeleteCertificateAsync(int id)
        {
            await _certificateRepository.DeleteCertificateAsync(id);
            await _certificateRepository.SaveChangesAsync();
        }
    }
}
