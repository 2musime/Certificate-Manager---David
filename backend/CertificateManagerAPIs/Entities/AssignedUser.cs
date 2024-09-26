using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Entities;

public partial class AssignedUser
{
    public int CertificateId { get; set; }

    public int UserId { get; set; }

    public DateTime? AssignedAt { get; set; }

    public virtual Certificate Certificate { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
