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
            var certificate = new Certificate
            {
                Type = dto.Type,
                ValidFrom = dto.ValidFrom,
                ValidTo = dto.ValidTo,
                PdfFile = dto.PdfFile,
                SupplierId = dto.SupplierId,
                AssignedUsers = new List<AssignedUser>(),
                Comments = new List<Comment>()
            };
            if (dto.AssignedUserIds != null)
            {
                foreach (var userId in dto.AssignedUserIds)
                {
                    certificate.AssignedUsers.Add(new AssignedUser
                    {
                        UserId = userId,
                        Certificate = certificate
                    });
                }
            }
            if (dto.Comments != null)
            {
                foreach (var commentDto in dto.Comments)
                {
                    certificate.Comments.Add(new Comment
                    {
                        UserId = commentDto.UserId,
                        UserComment = commentDto.UserComment
                    });
                }
            }
            await _certificateRepository.AddCertificateAsync(certificate);
            await _certificateRepository.SaveChangesAsync();
        }

        public async Task UpdateCertificateAsync(int id, CertificateUpdateDto dto)
        {
            var certificate = await _certificateRepository.GetCertificateByIdAsync(id);
            if (certificate == null) throw new Exception("Certificate not found");
            certificate.Type = dto.Type;
            certificate.ValidFrom = dto.ValidFrom;
            certificate.ValidTo = dto.ValidTo;
            certificate.PdfFile = dto.PdfFile;
            certificate.UserAssigned = dto.UserAssigned;
            certificate.SupplierId = dto.SupplierId;

            if (dto.NewComments != null && dto.NewComments.Any())
            {
                foreach (var commentDto in dto.NewComments)
                {
                    var newComment = new Comment
                    {
                        UserId = commentDto.UserId,
                        UserComment = commentDto.UserComment
                    };
                    certificate.Comments.Add(newComment);
                }
            }
            if (dto.AssignedUserIds != null && dto.AssignedUserIds.Any())
            {
                foreach (var userId in dto.AssignedUserIds)
                {
                    var newAssignedUser = new AssignedUser
                    {
                        UserId = userId,
                        Certificate = certificate
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
