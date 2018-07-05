// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["dojo/_base/kernel","../core/declare","dojo/Deferred","dojo/dom-attr","dojo/keys","dijit/registry","dijit/Dialog","../kernel","../core/lang","../core/Error","../core/domUtils","./Credential","./IdentityManagerBase","dojo/i18n!./nls/identity","dojo/query","dijit/form/Button","dijit/form/Form","dijit/form/ValidationTextBox"],function(e,t,i,r,s,n,d,o,a,l,c,u,_,g){return t([_],{declaredClass:"esri.identity.IdentityManager",constructor:function(e){a.mixin(this,e)},_dialogContent:"<div data-dojo-type='dijit.form.Form' data-dojo-props='\"class\":\"esriIdForm\"'><div class='dijitDialogPaneContentArea'><div style='padding-bottom: 5px; word-wrap: break-word;'>{info}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>{invalidUser}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><table style='width: 100%;'><tr><td>"+'<label>{lblUser}<br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"text", "class":"esriIdUser", required:true, trim:true, style:"width: 100%;", autocapitalize:"none", autocorrect:"off", spellcheck:false\' /></label></td></tr><tr><td><label>{lblPwd}<br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"password", "class":"esriIdPwd", required:true, style:"width: 100%;"\' /></label></td></tr></table></div><div class=\'dijitDialogPaneActionBar\'><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdSubmit"\'>{lblOk}</button><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdCancel"\'>{lblCancel}</button></div></div>',signIn:function(e,t,s){this._nls||(this._nls=g),this._loginDialog||(this._loginDialog=this.dialog=this._createLoginDialog(),this.emit("dialog-create"));var n=this._loginDialog,d=s&&s.error,o=s&&s.token,a=new i(function(){n.onCancel()});if(n.open){var u=new l("identity-manager:busy","BUSY");return a.reject(u),a.promise}return c.hide(n.errMsg_),d&&d.details&&403==d.details.httpStatus&&o&&(r.set(n.errMsg_,"innerHTML",this._nls.forbidden),c.show(n.errMsg_)),n.dfd_=a,n.serverInfo_=t,n.resUrl_=e,n.admin_=s&&s.isAdmin,r.set(n.resLink_,{title:e,innerHTML:"("+(this.getResourceName(e)||this._nls.lblItem)+")"}),r.set(n.serverLink_,{title:t.server,innerHTML:(-1!==t.server.toLowerCase().indexOf("arcgis.com")?"ArcGIS Online":t.server)+" "}),n.txtPwd_.set("value",""),n.show(),a.promise},_createLoginDialog:function(){var t=this._nls,i=a.substitute(t,this._dialogContent);i=a.substitute({resource:"<span class='resLink' style='word-wrap: break-word;'></span>",server:"<span class='serverLink' style='word-wrap: break-word;'></span>"},i);var _=new d({title:t.title,content:i,class:" esri-widget esriSignInDialog esriIdentityDialog",style:"width: 18em;",esriIdMgr_:this,onShow:function(){this.domNode.classList.add("esriIdentityDialog--visible")},onHide:function(){this.domNode.classList.remove("esriIdentityDialog--visible")},keypressed_:function(e){e.charOrCode===s.ENTER&&this.execute_()},execute_:function(){var e=this.txtUser_.get("value"),i=this.txtPwd_.get("value"),s=this.dfd_,n=this;if(this.form_.validate()&&e&&i){this.btnSubmit_.set("label",t.lblSigning);var a=o.id.findCredential(n.resUrl_,e),l=function(i){n.btnSubmit_.set("label",t.lblOk),n.btnSubmit_.set("disabled",!1),c.hide(n.errMsg_),n.hide(),d._DialogLevelManager.hide(n);var r=n.serverInfo_;n.dfd_=n.serverInfo_=n.generateDfd_=n.resUrl_=null;var o,l,_,g=a;i&&(o=i.token,l=null!=i.expires?Number(i.expires):null,_=!!i.ssl,g?(g.userId=e,g.token=o,g.expires=l,g.validity=i.validity,g.ssl=_,g.creationTime=(new Date).getTime()):g=new u({userId:e,server:r.server,token:o,expires:l,ssl:_,isAdmin:n.admin_,validity:i.validity})),s.resolve(g)};if(a&&!a._enqueued)return void l();n.btnSubmit_.set("disabled",!0),n.generateDfd_=o.id.generateToken(this.serverInfo_,{username:e,password:i},{isAdmin:this.admin_}).then(l).then(null,function(e){n.btnSubmit_.set("disabled",!1),n.generateDfd_=null,n.btnSubmit_.set("label",t.lblOk),r.set(n.errMsg_,"innerHTML",e&&e.details&&e.details.httpStatus?t.invalidUser:t.noAuthService),c.show(n.errMsg_)})}},cancel_:function(){_.generateDfd_&&_.generateDfd_.cancel();var e=_.dfd_,t=_.resUrl_,i=_.serverInfo_;_.btnSubmit_.set("disabled",!1),_.dfd_=_.serverInfo_=_.generateDfd_=_.resUrl_=null,c.hide(_.errMsg_),d._DialogLevelManager.hide(_),_.esriIdMgr_.emit("dialog-cancel",{resourceUrl:t,serverInfo:i});var r=new l("identity-manager:user-aborted","ABORTED");e.reject(r)}}),g=_.domNode;return _.form_=n.byNode(e.query(".esriIdForm",g)[0]),_.txtUser_=n.byNode(e.query(".esriIdUser",g)[0]),_.txtPwd_=n.byNode(e.query(".esriIdPwd",g)[0]),_.btnSubmit_=n.byNode(e.query(".esriIdSubmit",g)[0]),_.btnCancel_=n.byNode(e.query(".esriIdCancel",g)[0]),_.resLink_=e.query(".resLink",g)[0],_.serverLink_=e.query(".serverLink",g)[0],_.errMsg_=e.query(".esriErrorMsg",g)[0],_.connect(_.txtUser_,"onKeyPress",_.keypressed_),_.connect(_.txtPwd_,"onKeyPress",_.keypressed_),_.connect(_.btnSubmit_,"onClick",_.execute_),_.connect(_.btnCancel_,"onClick",_.onCancel),_.connect(_,"onCancel",_.cancel_),_}})});