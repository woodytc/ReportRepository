using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using KTBLeasing.Domain; 

namespace KTBLeasing.Mappings.FluentNh {
    
    
    public class ReportMap : ClassMap<Report> {
        
        public ReportMap() {
			Table("Report");
			Id(x => x.Id).GeneratedBy.Identity().Column("ID");
			Map(x => x.Reportname).Column("ReportName");
			Map(x => x.Reportfilename).Column("ReportFileName");
			Map(x => x.Path).Column("Path");
			Map(x => x.Createby).Column("CreateBy");
			Map(x => x.Createdate).Column("CreateDate");
			Map(x => x.Updateby).Column("UpdateBy");
			Map(x => x.Updatedate).Column("UpdateDate");
			Map(x => x.Isdelete).Column("IsDelete");
        }
    }
}
