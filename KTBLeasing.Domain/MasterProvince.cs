using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace KTBLeasing.Domain {
    
    public class MasterProvince {
        private int _id;
        private string _code;
        private string _name;
        //private int? _deptcode;
        //private int? _regioncode;
        private bool? _active;
        //mapping fk
        private MasterDepartment _masterDepartment;
        private MasterRegion _masterRegion;

        public virtual int Id {
            get {
                return this._id;
            }
            set {
                this._id = value;
            }
        }
        //[NotNullNotEmpty]
        public virtual string Code {
            get {
                return this._code;
            }
            set {
                this._code = value;
            }
        }
        public virtual string Name {
            get {
                return this._name;
            }
            set {
                this._name = value;
            }
        }
        //public virtual int? Deptcode {
        //    get {
        //        return this._deptcode;
        //    }
        //    set {
        //        this._deptcode = value;
        //    }
        //}
        //public virtual int? Regioncode {
        //    get {
        //        return this._regioncode;
        //    }
        //    set {
        //        this._regioncode = value;
        //    }
        //}
        public virtual bool? Active {
            get {
                return this._active;
            }
            set {
                this._active = value;
            }
        }

        //mapping
        public virtual MasterDepartment MasterDepartment
        {
            get
            {
                return this._masterDepartment;
            }
            set
            {
                this._masterDepartment = value;
            }
        }

        public virtual MasterRegion MasterRegion
        {
            get
            {
                return this._masterRegion;
            }
            set
            {
                this._masterRegion = value;
            }
        }
    }
}
