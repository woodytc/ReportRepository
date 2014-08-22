using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;


namespace KTBLeasing.Domain {
    
    public class Parameter {
        private int _id;
        private string _name;
        private DateTime? _updatedate;
        public Parameter() { }
        public int ID {
            get {
                return this._id;
            }
            set {
                this._id = value;
            }
        }
        public string Name {
            get {
                return this._name;
            }
            set {
                this._name = value;
            }
        }
        public DateTime? UpdateDate {
            get {
                return this._updatedate;
            }
            set {
                this._updatedate = value;
            }
        }
    }
}
