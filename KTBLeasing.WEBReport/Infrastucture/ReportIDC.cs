using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ninject;

using NHibernate;
using FluentNHibernate.Cfg;
using NHibernate.ByteCode.Castle;
using FluentNHibernate.Cfg.Db;
using System.Web.Mvc;

using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Mappings.FluentNh.Repository;
using KTBLeasing.Mappings.FluentNh;
using KTBLeasing.WEBReport.Properties;

namespace KTBLeasing.WEBReport.Infrastucture
{
    public class ReportIDC
    {
        public static void Initialize()
        {
            
            //log4net.Config.XmlConfigurator.Configure();
            IKernel kernel = new StandardKernel();

            kernel.Bind<ISessionFactory>().ToConstant(CreateSessionFactory()).InSingletonScope();

            kernel.Bind<IBatchtbRepository>()
                .To<BatchtbRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
            
            kernel.Bind<IBatchtbRepository>()
                .To<BatchtbRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());
           
            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }

        public static ISessionFactory CreateSessionFactory()
        {
            //Appist: 192.168.30.3
            return Fluently.Configure()
                .ProxyFactoryFactory<ProxyFactoryFactory>()
                .Database(MsSqlConfiguration.MsSql2008
                .ConnectionString(c => c
                .Server(Settings.Default.DatabaseServer) //dbuat01, 192.168.30.3, 192.168.10.11
                .Username(Settings.Default.UserName)
                .Password(Settings.Default.Password)
                .Database(Settings.Default. DatabaseName)))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<BatchtbMap>())
                .ExposeConfiguration(c => c.SetProperty("current_session_context_class", "thread_static"))
                .BuildSessionFactory();
        }

    }
}