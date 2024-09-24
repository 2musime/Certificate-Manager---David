namespace CertificateManagerAPIs.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? Department { get; set; }

    public string? Plant { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
