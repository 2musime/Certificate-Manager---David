using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Entities;

public partial class Supplier
{
    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = null!;

    public int? SupplierIndex { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string City { get; set; } = null!;

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}
