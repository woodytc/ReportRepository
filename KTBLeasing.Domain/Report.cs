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
        public int Id {
            get {
                return this._id;
            }
            set {
                this._id = value;
            }
        }
        public string Reportname {
            get {
                return this._reportname;
            }
            set {
                this._reportname = value;
            }
        }
        public string Reportfilename {
            get {
                return this._reportfilename;
            }
            set {
                this._reportfilename = value;
            }
        }
        public string Path {
            get {
                return this._path;
            }
            set {
                this._path = value;
            }
        }
        public string Createby {
            get {
                return this._createby;
            }
            set {
                this._createby = value;
            }
        }
        public DateTime? Createdate {
            get {
                return this._createdate;
            }
            set {
                this._createdate = value;
            }
        }
        public string Updateby {
            get {
                return this._updateby;
            }
            set {
                this._updateby = value;
            }
        }
        public DateTime? Updatedate {
            get {
                return this._updatedate;
            }
            set {
                this._updatedate = value;
            }
        }
        public bool? Isdelete {
            get {
                return this._isdelete;
            }
            set {
                this._isdelete = value;
            }
        }
    }
}
