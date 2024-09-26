using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Entities;

public partial class Certificate
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    public string PdfFile { get; set; } = null!;

    public int? UserAssigned { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? ModifiedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public int SupplierId { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Supplier Supplier { get; set; } = null!;

    public virtual User? UserAssignedNavigation { get; set; }
}
