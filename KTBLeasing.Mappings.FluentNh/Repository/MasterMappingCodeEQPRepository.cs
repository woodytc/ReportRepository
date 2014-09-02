using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;
using NHibernate;
using KTBLeasing.Domain.Model;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class MasterMappingEQPAndAssetTypeRepository : NhRepository, IMasterMappingEQPAndAssetTypeRepository
    {
        public void Insert(MasterMappingEQPAndAssetType entity)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Save(entity);
                    ts.Commit();
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                }
            }
        }

        public void Update(MasterMappingEQPAndAssetType entity)
        { 
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Update(entity);
                    ts.Commit();
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                }
            }
        }

        public void SaveOrUpdate(MasterMappingEQPAndAssetType entity)
        {

            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.SaveOrUpdate(entity);
                    ts.Commit();
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                }
            }
        }

        public List<MasterMappingEQPAndAssetType> Get()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterMappingEQPAndAssetType>().List() as List<MasterMappingEQPAndAssetType>;
                return result;
            }
        }

        public int test()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = (from x in session.QueryOver<MasterAssetType>().List()
                              join y in session.QueryOver<MasterMappingCodeEQP>().List()
                                  on x.Id equals y.Masterassettype.Id
                              select new { x.Id, y.EQPCode }).ToList();
                return result.Count();
            }
        }
        //select a.EQPCode, a.AssetID, b.EQPDesc, c.AssetType 
        //from dbo.MasterMappingEQPAndAssetType a
        //left outer join dbo.MasterMappingCodeEQP b 
        //    on a.EQPCode = b.EQPCode
        //left outer join dbo.MasterAssetType c
        //    on a.AssetID = c.id
        //order by a.AssetID asc

        public List<AssetTypeMappingModel> GetMappingAssetTypeList()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = from A in session.QueryOver<MasterMappingEQPAndAssetType>().List()
                             join B in session.QueryOver<MasterMappingCodeEQP>().List() on A.EQPCode equals B.EQPCode
                             join C in session.QueryOver<MasterAssetType>().List() on new { AssetID = A.AssetID } equals new { AssetID = C.Id }
                             select new AssetTypeMappingModel
                             {
                                 EQPCode = A.EQPCode,
                                 AssetID = A.AssetID,
                                 EQPDescription = B.EQPDescription,
                                 AssetType = C.AssetType,
                             };

                return result.ToList<AssetTypeMappingModel>();
            }
        }
    }
}