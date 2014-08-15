using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace KTBLeasing.Domain {
    
    public class MasterRegion {
        private int _code;
        private string _name;
        private bool? _isdelete;
        public virtual int Code {
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
        public virtual bool? IsDelete {
            get {
                return this._isdelete;
            }
            set {
                this._isdelete = value;
            }
        }
    }
}
