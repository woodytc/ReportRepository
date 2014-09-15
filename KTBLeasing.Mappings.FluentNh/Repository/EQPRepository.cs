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
    public class EQPRepository : NhRepository, IMasterCodeEQPRepository
    {
        public bool Insert(MasterCodeEQP entity)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Insert(entity);
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

        public bool Insert(MasterCodeEQP entity, MasterMappingEQPAndAssetType entity2)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    session.Insert(entity);
                    session.Insert(entity2);
                    ts.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    ts.Rollback();
                    ts.Dispose();
                    return false;
                }
            }
        }

        public bool Update(MasterCodeEQP entity)
        { 
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

        public void SaveOrUpdate(MasterCodeEQP entity)
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

        public bool Delete(List<int> entity)
        {

            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                try
                {
                    var result = session.CreateSQLQuery("select * from MasterMappingEQPAndAssetType where EQPCode in (:id) and IsDelete = 0 and AssetID != 11")
                                .SetParameterList("id", entity).List();
                    
                    if(result.Count == 0)
                    {
                        entity.ForEach(x =>
                        {
                            session.Delete(new MasterCodeEQP { EQPCode = x });
                            session.CreateSQLQuery("delete from MasterMappingEQPAndAssetType where EQPCode = :EQPCode")
                                .SetInt32("EQPCode", x).ExecuteUpdate();
                            
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

        public List<MasterCodeEQP> Get()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterCodeEQP>().List() as List<MasterCodeEQP>;
                return result;
            }
        }

        public List<MasterCodeEQP> GetTest()
        {
            MasterAssetType fromDb = new MasterAssetType();
            using (var session = SessionFactory.OpenStatelessSession())
            {
                
                //var result = session.QueryOver<MasterMappingCodeEQP>();
                //              NHibernateUtil.Initialize(fromDb.Id);
                //var result = session.QueryOver<MasterCodeEQP>()
                //    .Fetch(x => x.Masterassettype).Eager
                //    .TransformUsing(new DistinctRootEntityResultTransformer())
                //    .List();

                 //return result as List<MasterCodeEQP>;
                return null;
            }
        }
        
    }
}
