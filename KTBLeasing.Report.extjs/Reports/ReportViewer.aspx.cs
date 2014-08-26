using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Collections;
using KTBLeasing.Report.extjs.Helper;

namespace KTBLeasing.Report.extjs.Reports
{
    public partial class ReportViewer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!Page.IsPostBack)
                {
                    ShowReport();
                }
            }
            catch (Exception ex)
            {
                txtErrorMessage.Text = ex.Message.ToString();
            }
        }
        private void ShowReport()
        {
            try
            {
                string urlReportServer = string.Format("http://{0}/ReportServer", Session["ReportServer"].ToString());

                rptViewer.ProcessingMode = ProcessingMode.Remote; // ProcessingMode will be Either Remote or Local
                rptViewer.ServerReport.ReportServerUrl = new Uri(urlReportServer); //Set the ReportServer Url
                rptViewer.ServerReport.ReportPath = string.Format("/{0}/{1}", Session["ReportPath"].ToString(), Session["ReportName"].ToString()); //Passing the Report Path                

                var reportParameters = (Dictionary<string, string>)Session["ReportParameters"];

                //Specify the server credentials
                IReportServerCredentials irsc = new CustomReportCredentials("phutip_pr", "pomnot8", "ktbleasing");
                rptViewer.ServerReport.ReportServerCredentials = irsc;

                if ((Dictionary<string, string>)Session["ReportParameters"] != null && !reportParameters.ContainsKey("null"))
                    this.CreateReportParameter(reportParameters);

                rptViewer.ServerReport.Refresh();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void CreateReportParameter(Dictionary<string, string> reportParameters)
        {
            foreach (var item in reportParameters)
            {
                rptViewer.ServerReport.SetParameters(new ReportParameter(item.Key, item.Value));
            }
        }
    }
}