using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Entities;

public partial class Comment
{
    public int Id { get; set; }

    public int CertificateId { get; set; }

    public int UserId { get; set; }

    public string UserComment { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public virtual Certificate Certificate { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
