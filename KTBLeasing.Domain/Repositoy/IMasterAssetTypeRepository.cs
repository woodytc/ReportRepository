using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterAssetTypeRepository
    {
        bool Insert(MasterAssetType entity);
        bool Update(MasterAssetType entity);
        bool SaveOrUpdate(MasterAssetType entity);
        bool Delete(List<int> entity);
        List<MasterAssetType> Get();
    }
}
