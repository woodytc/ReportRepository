using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;
using NHibernate;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class AssetTypeRepository : NhRepository, IMasterAssetTypeRepository
    {
        public bool Insert(MasterAssetType entity) {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Save(entity);
                    ts.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                    return false;
                }
            }
        }

        public bool Update(MasterAssetType entity) { 
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Update(entity);
                    ts.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                    return false;
                }
            }
        }

        public bool SaveOrUpdate(MasterAssetType entity) {

            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.SaveOrUpdate(entity);
                    ts.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    ts.Dispose();
                    return false;
                }
            }
        }

        public bool Delete(List<int> entity)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    var result = session.CreateSQLQuery("select * from MasterMappingEQPAndAssetType where AssetID in (:id) and IsDelete != 0")
                                .SetParameterList("id", entity).List();

                    if (result.Count == 0)
                    {
                        entity.ForEach(x =>
                        {
                            session.Delete(new MasterAssetType { ID = x });
                        });
                        ts.Commit();
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                    //session.Delete(new MasterCodeEQP { EQPCode = 0 });
                    //ts.Commit();
                }
                catch (Exception ex)
                {
                    ts.Rollback();
                    ts.Dispose();
                    return false;
                }
            }
        }

        public List<MasterAssetType> Get() {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterAssetType>().List() as List<MasterAssetType>;
                return result;
            }
        }
        
    }
}
