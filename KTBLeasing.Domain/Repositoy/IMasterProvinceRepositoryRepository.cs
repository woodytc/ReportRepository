using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterProvinceRepository
    {
        void Insert(MasterProvince entity);
        void Update(MasterProvince entity);
        void SaveOrUpdate(MasterProvince entity);
        List<MasterProvince> Get();
        List<MasterProvince> GetTest();
    }
}
