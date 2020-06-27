/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate commercial paper state values
// const cpState = {
//     ISSUED: 1,
//     TRADING: 2,
//     REDEEMED: 3
// };

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class CommercialPaper extends State {

    constructor(obj) {
        // [project_id, project_name] 组成 id?
        super(CommercialPaper.getClass(), [obj.project_id, obj.project_name]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getTotalProgress() {
        return this.total_progress;
    }

    setTotalProgress(new_total_progress) {
        this.total_progress = new_total_progress;
    }

    // getIssuer() {
    //     return this.issuer;
    // }

    // setIssuer(newIssuer) {
    //     this.issuer = newIssuer;
    // }

    // getOwner() {
    //     return this.owner;
    // }

    // setOwner(newOwner) {
    //     this.owner = newOwner;
    // }

    /**
     * Useful methods to encapsulate commercial paper states
     */
    // setIssued() {
    //     this.currentState = cpState.ISSUED;
    // }

    // setTrading() {
    //     this.currentState = cpState.TRADING;
    // }

    // setRedeemed() {
    //     this.currentState = cpState.REDEEMED;
    // }

    // isIssued() {
    //     return this.currentState === cpState.ISSUED;
    // }

    // isTrading() {
    //     return this.currentState === cpState.TRADING;
    // }

    // isRedeemed() {
    //     return this.currentState === cpState.REDEEMED;
    // }

    static fromBuffer(buffer) {
        return CommercialPaper.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, CommercialPaper);
    }

    /**
     * Factory method to create a commercial paper object
     * @param {String} project_id - 项目编号
     * @param {String} project_name - 项目名称
     * @param {String} company_name - 单位名称
     * @param {String} start_date - 开工日期：
     * @param {Integer} total_progress - 总进度：
     * @param {Integer} wutan_progress - 物探进度
     * @param {Integer} huatan_progress - 化探进度
     * @param {Integer} zuantan_progress - 钻探进度
     * @param {Integer} kengtan_progress - 坑探进度
     * @param {Integer} caotan_progress - 槽探进度
     * @param {Integer} qianjing_progress - 浅井进度
     * @param {Integer} allocated_budget - 已拨付预算
     * @param {Integer} total_budget - 总预算
     */
    static createInstance(project_id, project_name, company_name, start_date, total_progress, wutan_progress, huatan_progress, zuantan_progress, kengtan_progress, caotan_progress, qianjing_progress, allocated_budget, total_budget) {
        return new CommercialPaper({ project_id, project_name,  company_name, start_date, total_progress, wutan_progress, huatan_progress, zuantan_progress, kengtan_progress, caotan_progress, qianjing_progress, allocated_budget, total_budget});
    }

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = CommercialPaper;
