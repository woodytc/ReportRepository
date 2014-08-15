using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterProvinceRepository
    {
        void Insert(MasterSection entity);
        void Update(MasterSection entity);
        void SaveOrUpdate(MasterSection entity);
        List<MasterSection> Get();
        List<MasterSection> GetTest();
    }
}
