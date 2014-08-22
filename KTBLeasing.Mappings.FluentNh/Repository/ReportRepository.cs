using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;
using KTBLeasing.Helpers;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class ReportRepository : NhRepository, IReportRepository
    {
        public void Insert(Report entity) {
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

        public void Update(Report entity)
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

        public void SaveOrUpdate(Report entity)
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

        public List<Report> Get()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<Report>().List() as List<Report>;
                return result;
            }
        }

        public List<Report> Get(int start, int limit, string direction)
        {

            return null;
        }

        /** [20140820] woody Add get report parameters */

        public List<Reportparameter> GetReportParmById(int idreport)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<Reportparameter>()
                    .Fetch(x => x.Parameter).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                    .Fetch(x => x.Report).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                    .List();

                return result as List<Reportparameter>;
                
            }
        }

        public List<T> GetParameterReport<T>(int id)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                //var result = from x in
                //                 session.QueryOver<Parameter>().List()
                //             join y in session.QueryOver<Reportparameter>().List()
                //             on x.ID equals y.ParamID
                //             where y.ReportID == id
                //             select new
                //             {
                //                 ReportID = y.ReportID,
                //                 ParameterID = y.ParamID,
                //                 ParameterName = x.Name
                //             };
                var result = session.QueryOver<Reportparameter>()
                    .Fetch(x => x.Parameter).Eager
                    .TransformUsing(new DistinctRootEntityResultTransformer())
                 
                    .List();
                var abc = result.Count;
                result.Count();
                return result as List<T>;
            }
            
        }

        

        
    }
}
