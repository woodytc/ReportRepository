using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterAssetTypeRepository
    {
        void Insert(MasterAssetType entity);
        void Update(MasterAssetType entity);
        void SaveOrUpdate(MasterAssetType entity);
        List<MasterAssetType> Get();
    }
}
