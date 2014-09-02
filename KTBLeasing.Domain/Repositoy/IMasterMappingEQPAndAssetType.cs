using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain;
using KTBLeasing.Domain.Model;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IMasterMappingEQPAndAssetTypeRepository
    {
        void Insert(MasterMappingEQPAndAssetType entity);
        void Update(MasterMappingEQPAndAssetType entity);
        void SaveOrUpdate(MasterMappingEQPAndAssetType entity);
        List<MasterMappingEQPAndAssetType> Get();
        List<AssetTypeMappingModel> GetMappingAssetTypeList();
    }
}
