using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using NHibernate;
using FluentNHibernate.Cfg;
using NHibernate.ByteCode.Castle;
using FluentNHibernate.Cfg.Db;
using Ninject;
using KTBLeasing.Domain.Repositoy;
using KTBLeasing.Mappings.FluentNh.Repository;
using KTBLeasing.Report.extjs.Properties;
using KTBLeasing.Mappings.FluentNh;
using System.Web.Mvc;

namespace KTBLeasing.Report.extjs.Infrastucture
{
    public class ReportDI
    {
        public static void Initialize()
        {
            IKernel kernel = new StandardKernel();

            var a = CreateSessionFactory();
            kernel.Bind<ISessionFactory>().ToConstant(CreateSessionFactory()).InSingletonScope();

            kernel.Bind<WS_ActiveDirectory.IWS_LoginAD>().To<WS_ActiveDirectory.WS_LoginADClient>();

            kernel.Bind<IMasterAssetTypeRepository>()
                .To<MasterAssetTypeRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            //Report
            kernel.Bind<IReportRepository>()
                .To<ReportRepository>()
                .WithPropertyValue("SessionFactory", CreateReportSessionFactory());


            kernel.Bind<IMasterMappingCodeEQPMapRepository>()
                .To<MasterMappingCodeEQPMapRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            kernel.Bind<IMasterProvinceRepository>()
                .To<MasterProvinceRepository>()
                .WithPropertyValue("SessionFactory", kernel.Get<ISessionFactory>());

            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));

        }

        private static ISessionFactory CreateSessionFactory()
        {
            //Appist: 192.168.30.3
            return Fluently.Configure()
                .ProxyFactoryFactory<ProxyFactoryFactory>()
                .Database(MsSqlConfiguration.MsSql2008
                .ConnectionString(c => c
                .Server(Settings.Default.ServerDatabase) //dbuat01, 192.168.30.3, 192.168.10.11
                .Username(Settings.Default.UsernameDatabase)
                .Password(Settings.Default.PasswordDatabase)
                .Database(Settings.Default.Database)))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<MasterAssetTypeMap>())
                .ExposeConfiguration(c => c.SetProperty("current_session_context_class", "thread_static"))
                .BuildSessionFactory();
        }

        public static ISessionFactory CreateReportSessionFactory()
        {
            //Appist: 192.168.30.3
            return Fluently.Configure()
                .ProxyFactoryFactory<ProxyFactoryFactory>()
                .Database(MsSqlConfiguration.MsSql2008
                .ConnectionString(c => c
                .Server(Settings.Default.ServerDatabaseReport) //dbuat01, 192.168.30.3, 192.168.10.11
                .Username(Settings.Default.UsernameDatabaseReport)
                .Password(Settings.Default.PasswordDatabaseReport)
                .Database(Settings.Default.DatabaseReport)))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<ReportMap>())
                .ExposeConfiguration(c => c.SetProperty("current_session_context_class", "thread_static"))
                .BuildSessionFactory();
        }
    }
}