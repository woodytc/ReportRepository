using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IReportRepository
    {
        void Insert(Report entity);
        void Update(Report entity);
        void SaveOrUpdate(Report entity);
        List<Report> Get();
        /** [20140822] Thawatcahi.T get report parameter*/
        List<T> GetParameterReport<T>(int id);
        /** [20140825] Thawatchai.T Get combo Arg status */
        List<AgrStatus> GetAgrStatus();
    }
}
