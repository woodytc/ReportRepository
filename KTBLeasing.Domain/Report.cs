using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;


namespace KTBLeasing.Domain {
    
    public class Report {
        private int _id;
        private string _reportname;
        private string _reportfilename;
        private string _path;
        private string _createby;
        private DateTime? _createdate;
        private string _updateby;
        private DateTime? _updatedate;
        private bool? _isdelete;
        public Report() { }
        public virtual int Id
        {
            get {
                return this._id;
            }
            set {
                this._id = value;
            }
        }
        public virtual string Reportname
        {
            get {
                return this._reportname;
            }
            set {
                this._reportname = value;
            }
        }
        public virtual string Reportfilename
        {
            get {
                return this._reportfilename;
            }
            set {
                this._reportfilename = value;
            }
        }
        public virtual string Path
        {
            get {
                return this._path;
            }
            set {
                this._path = value;
            }
        }
        public virtual string Createby
        {
            get {
                return this._createby;
            }
            set {
                this._createby = value;
            }
        }
        public virtual DateTime? Createdate
        {
            get {
                return this._createdate;
            }
            set {
                this._createdate = value;
            }
        }
        public virtual string Updateby
        {
            get {
                return this._updateby;
            }
            set {
                this._updateby = value;
            }
        }
        public virtual DateTime? Updatedate
        {
            get {
                return this._updatedate;
            }
            set {
                this._updatedate = value;
            }
        }
        public virtual bool? Isdelete
        {
            get {
                return this._isdelete;
            }
            set {
                this._isdelete = value;
            }
        }
    }
}
