using System;
using System.Collections.Generic;

namespace CertificateManagerAPIs.Models;

public partial class Supplier
{
    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = null!;

    public int? SupplierIndex { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}
