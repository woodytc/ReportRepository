using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterMappingCodeEQPMapRepository
    {
        void Insert(MasterMappingCodeEQP entity);
        void Update(MasterMappingCodeEQP entity);
        void SaveOrUpdate(MasterMappingCodeEQP entity);
        List<MasterMappingCodeEQP> Get();
        List<MasterMappingCodeEQP> GetTest();
    }
}
