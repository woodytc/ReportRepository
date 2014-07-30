using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KTBLeasing.Domain;

namespace KTBLeasing.Domain.Repositoy
{
    public interface IBatchtbRepository
    {
        void Insert(Batchtb entity);
        void Update(Batchtb entity);
        void SaveOrUpdate(Batchtb entity);
        List<Batchtb> Get();
        //List<Batchtb> GetLimit();
        List<RPT001Domain> GetLimit();
    }
}
