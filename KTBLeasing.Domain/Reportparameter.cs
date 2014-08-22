using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel;


namespace KTBLeasing.Domain {
    
    public class Reportparameter {
        private int _reportid;
        private int _paramid;
        private Parameter _parameter;
        private Report _report;
        private DateTime? _updatedate;
        public virtual int ReportID
        {
            get {
                return this._reportid;
            }
            set {
                this._reportid = value;
            }
        }
        public virtual int ParamID
        {
            get {
                return this._paramid;
            }
            set {
                this._paramid = value;
            }
        }
        public virtual Parameter Parameter
        {
            get {
                return this._parameter;
            }
            set {
                this._parameter = value;
            }
        }
        public virtual Report Report
        {
            get {
                return this._report;
            }
            set {
                this._report = value;
            }
        }
        public virtual DateTime? UpdateDate
        {
            get {
                return this._updatedate;
            }
            set {
                this._updatedate = value;
            }
        }
        #region NHibernate Composite Key Requirements
        public override bool Equals(object obj) {
			if (obj == null) return false;
			var t = obj as Reportparameter;
			if (t == null) return false;
			if (ReportID == t.ReportID
			 && ParamID == t.ParamID)
				return true;

			return false;
        }
        public override int GetHashCode() {
			int hash = GetType().GetHashCode();
			hash = (hash * 397) ^ ReportID.GetHashCode();
			hash = (hash * 397) ^ ParamID.GetHashCode();

			return hash;
        }
        #endregion
    }
}
