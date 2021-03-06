﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Model
{
    public class AssetTypeMappingModel
    {
        public virtual int EQPCode { get; set; }
        public virtual int AssetID { get; set; }
        public virtual string EQPDescription { get; set; }
        public virtual string AssetType { get; set; }
        public virtual bool IsDelete { get; set; }
        public virtual string UpdateUser { get; set; }
        public virtual DateTime UpdateDate { get; set; }
        public virtual int ID { get; set; }
    }
}
