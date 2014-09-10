﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterCodeEQPRepository
    {
        bool Insert(MasterCodeEQP entity);
        bool Update(MasterCodeEQP entity);
        void SaveOrUpdate(MasterCodeEQP entity);
        bool Delete(List<int> entity);
        List<MasterCodeEQP> Get();
    }
}
