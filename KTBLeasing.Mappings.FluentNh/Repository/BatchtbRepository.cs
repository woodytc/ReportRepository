using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Domain;
using NHibernate.Transform;

namespace KTBLeasing.Mappings.FluentNh.Repository
{
    public class BatchtbRepository : NhRepository, IBatchtbRepository
    {
        public void Insert(Batchtb entity) {
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

        public void Update(Batchtb entity) { 
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

        public void SaveOrUpdate(Batchtb entity) {
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

        public List<Batchtb> Get() {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<Batchtb>().List() as List<Batchtb>;
                return result;
            }
        }

        public List<RPT001Domain> GetLimit()
        {
            using (var session = SessionFactory.OpenSession())
            {
                var tab = session.CreateSQLQuery("SELECT " +
                                     "Case when ltrim(rtrim(BRANCH_K)) != '' and BRANCH_K is not null then BRANCH_K else 'N9999' end BranchK" +
                                    ",REGION Region" +
                                    ",REGION_DESC RegionDesc" +
                                    ",DEPT Dept" +
                                    ",case when LATE_MAX > 365 then 'เกิน 1 ปี' " +
                                    "    when LATE_MAX > 180 then 'เกิน 180 วัน' " +
                                    "    when LATE_MAX = 0 then 'ไมมี' " +
                                    "    else 'ไม่เกิน 180' " +
                                    "    end TypeLateMax " +
                                    ",  sum(1) Counts " +
                                  "FROM batchtb " +
                                  "where DEPT not in ('CC','CH','CP') " +
                                  "group by Case when ltrim(rtrim(BRANCH_K)) != '' and BRANCH_K is not null then BRANCH_K else 'N9999' end, REGION ,REGION_DESC ,DEPT , case when LATE_MAX > 365 then 'เกิน 1 ปี' when LATE_MAX > 180 then 'เกิน 180 วัน' when LATE_MAX = 0 then 'ไมมี' else 'ไม่เกิน 180' end"
                            );//.List() as List<RPT001Domain>;
               
                var results = tab
                            .SetResultTransformer(Transformers.AliasToBean(typeof(RPT001Domain)))
                            .List<RPT001Domain>();
                session.Close();
                return results as List<RPT001Domain>;
            }
        }

    }
}
