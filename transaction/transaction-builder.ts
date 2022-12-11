import {decodeTransactionCommon,encodeTransactionCommon} from './../message/transaction-encoding.js'
import type { TransactionCommon } from './../message/transaction-types.js'

export interface Output {
    script: Uint8Array;
    value: number;
}
export interface Input {
    hash: Uint8Array;
    index: number;
    script: Uint8Array;
    sequence: number;
}


export class Transaction {
    constructor(
      
        public version:number,
        public locktime:number,
        public ins: Input[],
        public outs: Output[],
      ) {
        this.version = version=2;
        this.locktime = locktime=0;
        this.ins = [];
        this.outs = [];
      }
    static readonly DEFAULT_SEQUENCE = 4294967295;
    static readonly SIGHASH_DEFAULT = 0;
    static readonly SIGHASH_ALL = 1;
    static readonly SIGHASH_NONE = 2;
    static readonly SIGHASH_SINGLE = 3;
    static readonly SIGHASH_ANYONECANPAY = 128;
    static readonly SIGHASH_OUTPUT_MASK = 3;
    static readonly SIGHASH_INPUT_MASK = 128;
    static readonly ADVANCED_TRANSACTION_MARKER = 0;
    static readonly ADVANCED_TRANSACTION_FLAG = 1;
    static decodeTransaction = decodeTransactionCommon; 
    static isCoinbaseHash(txid: Uint8Array): boolean;
    static isCoinbaseHash(txid:Uint8Array) {
        for (let i = 0; i < 32; ++i) {
          if (txid[i] !== 0) return false;
        }
        return true;
      }

    isCoinbase(): boolean;
    isCoinbase() {
        return (
          this.ins.length === 1 && Transaction.isCoinbaseHash(this.ins[0].hash)
        );
      }
      addInput(hash: Uint8Array, index: number, sequence?: number, scriptSig?: Uint8Array): number{

        if (!sequence) {
          sequence = Transaction.DEFAULT_SEQUENCE;
        }
        return (
          this.ins.push({
            hash,
            index,
            script: scriptSig || new Uint8Array([]),
            sequence: sequence,
            
          }) - 1
        );
      }
      addOutput(scriptPubKey: Uint8Array, value: number): number{
        return (
          this.outs.push({
            script: scriptPubKey,
            value,
          }) - 1
        );
      }
            /**
      TODO: implement estimateTransaction
      weight() {
        const base = this.byteLength(false);
        const total = this.byteLength(true);
        return base * 3 + total;
      }
      virtualSize() {
        return Math.ceil(this.weight() / 4);
      }


      byteLength(_ALLOW_WITNESS = true) {
        return (
          (8) +
          bufferutils_1.varuint.encodingLength(this.ins.length) +
          bufferutils_1.varuint.encodingLength(this.outs.length) +
          this.ins.reduce((sum, input) => {
            return sum + 40 + varSliceSize(input.script);
          }, 0) +
          this.outs.reduce((sum, output) => {
            return sum + 8 + varSliceSize(output.script);
          }, 0) +
          (hasWitnesses
            ? this.ins.reduce((sum, input) => {
                return sum + vectorSize(input.witness);
              }, 0)
            : 0)
        );
      }
       */
      clone() {
        const newTx = new Transaction(this.version,this.locktime,this.ins,this.outs);
      
        // newTx.ins = this.ins.map(txIn => 
        //  {
        //     hash: txIn.hash,
        //     index: txIn.index,
        //     script: txIn.script,
        //     sequence: txIn.sequence,
           
         
        // });
        // newTx.outs = this.outs.map(txOut => {
        //   return {
        //     script: txOut.script,
        //     value: txOut.value,
        //   };
        // });
        // return newTx;
      }
  
}