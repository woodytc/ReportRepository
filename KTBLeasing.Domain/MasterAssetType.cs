using System;
using System.Text;
using System.Collections.Generic;


namespace KTBLeasing.Domain {
    
    public class MasterAssetType {
        private int _id;
        private string _assettype;
        private bool? _active;
        private DateTime? _createdate;
        private DateTime? _updatedate;
        public MasterAssetType() { }
        public virtual int ID {
            get {
                return this._id;
            }
            set {
                this._id = value;
            }
        }
        public virtual string AssetType {
            get {
                return this._assettype;
            }
            set {
                this._assettype = value;
            }
        }
        public virtual bool? Active {
            get {
                return this._active;
            }
            set {
                this._active = value;
            }
        }
        public virtual DateTime? CreateDate {
            get {
                return this._createdate;
            }
            set {
                this._createdate = value;
            }
        }
        public virtual DateTime? UpdateDate {
            get {
                return this._updatedate;
            }
            set {
                this._updatedate = value;
            }
        }
    }
}
