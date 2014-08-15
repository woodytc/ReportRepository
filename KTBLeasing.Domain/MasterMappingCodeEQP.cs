using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace KTBLeasing.Domain {
    
    public class MasterMappingCodeEQP {
        public MasterMappingCodeEQP() { }
        private int _eqpcode;
        private string _comid;
        private string _eqpdesc;
        private int _assetcode;
        private MasterAssetType _masterassettype;
        public virtual int EQPCode {
            get {
                return this._eqpcode;
            }
            set {
                this._eqpcode = value;
            }
        }
        public virtual string ComID {
            get {
                return this._comid;
            }
            set {
                this._comid = value;
            }
        }
        public virtual string EQPDescription {
            get {
                return this._eqpdesc;
            }
            set {
                this._eqpdesc = value;
            }
        }
       // [NotNullNotEmpty]
        public virtual int AssetCode {
            get {
                return this._assetcode;
            }
            set {
                this._assetcode = value;
            }
        }


        public virtual MasterAssetType Masterassettype
        {
            get {
                return this._masterassettype;
            }
            set {
                this._masterassettype = value;
            }
        }
    }
}
