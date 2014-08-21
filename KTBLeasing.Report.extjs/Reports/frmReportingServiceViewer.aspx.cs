using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Microsoft.Reporting.WebForms;
using System.Collections;
using System.Globalization;
using Microsoft.Reporting.Common;
using System.Configuration;
using KTBLeasing.Report.extjs.Properties;
using KTBLeasing.Report.extjs.Helper;

public partial class Reports_frmReportRequestReturn : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!Page.IsPostBack)
            {
                ShowReport();
            }

            Session.Clear();
        }
        catch (Exception ex)
        {
            Label txtErrorMessage = (Label)FindControl("txtErrorMessage");
            txtErrorMessage.Text = ex.Message.ToString();
        }
    }
    private void ShowReport()
    {
        try
        {
            ReportViewer rptViewer = (ReportViewer)FindControl("rptViewer");

            string urlReportServer = string.Format("http://{0}/ReportServer", Session["ReportServer"].ToString());
            
            rptViewer.ProcessingMode = ProcessingMode.Remote; // ProcessingMode will be Either Remote or Local
            rptViewer.ServerReport.ReportServerUrl = new Uri(urlReportServer); //Set the ReportServer Url
            rptViewer.ServerReport.ReportPath = string.Format("/{0}/{1}", Session["ReportPath"].ToString(), Session["ReportName"].ToString()); //Passing the Report Path                

            var reportParameters = (Dictionary<string, string>)Session["ReportParameters"];

            if((Dictionary<string, string>)Session["ReportParameters"] != null && !reportParameters.ContainsKey("null"))
                this.CreateReportParameter(reportParameters);

            ////pass crendentitilas
            //IReportServerCredentials irsc = new CustomReportCredentials("hpssrs", "hpssrs", "ktbleasing");
            //rptViewer.ServerReport.ReportServerCredentials = irsc;

            //Specify the server credentials
            IReportServerCredentials irsc = new CustomReportCredentials("phutip_pr", "pomnot8", "ktbleasing");
            rptViewer.ServerReport.ReportServerCredentials = irsc;

            rptViewer.ServerReport.Refresh();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private void CreateReportParameter(Dictionary<string,string> reportParameters)
    {
        ReportViewer rptViewer = (ReportViewer)FindControl("rptViewer");

        reportParameters = (Dictionary<string, string>)Session["ReportParameters"];

        foreach (var item in reportParameters)
        {
            rptViewer.ServerReport.SetParameters(new List<ReportParameter>()
              {
                new ReportParameter(item.Key, item.Value)
              });
        }
    }
}