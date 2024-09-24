using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int CertificateId { get; set; }

    public int UserId { get; set; }

    public string Comment1 { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Certificate Certificate { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
