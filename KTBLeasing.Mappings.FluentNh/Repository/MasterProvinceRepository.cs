using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;
using NHibernate;
using KTBLeasing.Domain.Page;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class MasterProvinceRepository : NhRepository, IMasterProvinceRepository
    {
        public void Insert(MasterSection entity)
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

        public void Update(MasterSection entity)
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

        public void SaveOrUpdate(MasterSection entity)
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

        public List<MasterSection> Get()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterSection>().List() as List<MasterSection>;
                return result;
            }
        }

        public List<MasterSection> GetTest()
        {
            MasterAssetType fromDb = new MasterAssetType();
            using (var session = SessionFactory.OpenStatelessSession())
            {
                
                
                var result = session.QueryOver<MasterSection>()
                    .Fetch(x => x.MasterRegion).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                    .Fetch(x=>x.MasterDepartment).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                    .List();

                 return result as List<MasterSection>;
            }
        }

        public void GetTree()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<MasterSection>()
                             .Select(x => new RootObject {
                                Id = x.MasterDepartment.Code
                             });
            }
        }
        
    }
}
