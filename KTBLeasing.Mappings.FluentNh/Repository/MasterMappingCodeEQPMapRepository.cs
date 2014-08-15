using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;
using NHibernate;
using KTBLeasing.Domain.Repositoy;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class MasterMappingCodeEQPMapRepository : NhRepository, IMasterMappingCodeEQPMapRepository
    {
        public void Insert(MasterMappingCodeEQP entity)
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

        public void Update(MasterMappingCodeEQP entity)
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

        public void SaveOrUpdate(MasterMappingCodeEQP entity)
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

        public List<MasterMappingCodeEQP> Get()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterMappingCodeEQP>().List() as List<MasterMappingCodeEQP>;
                return result;
            }
        }

        public List<MasterMappingCodeEQP> GetTest()
        {
            MasterAssetType fromDb = new MasterAssetType();
            using (var session = SessionFactory.OpenStatelessSession())
            {
                
                //var result = session.QueryOver<MasterMappingCodeEQP>();
                //              NHibernateUtil.Initialize(fromDb.Id);
                var result = session.QueryOver<MasterMappingCodeEQP>()
                    .Fetch(x => x.Masterassettype).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                    .List();

                 return result as List<MasterMappingCodeEQP>;
            }
        }
        
    }
}
