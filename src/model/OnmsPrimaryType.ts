import {OnmsEnum, forId, forLabel} from '../internal/OnmsEnum';

/**
 * Represents an OpenNMS "SNMP primary" type.
 * @module OnmsPrimaryType
 */
export class OnmsPrimaryType extends OnmsEnum<string> {
  /** Given an ID, return the matching primary type object. */
  public static forId(id: string) {
    return forId(PrimaryTypes, id);
  }

  /** Given a label, return the matching primary type object. */
  public static forLabel(label: string) {
    return forLabel(PrimaryTypes, label);
  }

  /** Whether or not the interface is a primary SNMP interface. */
  public isPrimary() {
    return this.id === 'P';
  }
}

/* tslint:disable:object-literal-sort-keys */
const PrimaryTypes = {
  /** Primary SNMP interface */
  PRIMARY: new OnmsPrimaryType('P', 'PRIMARY'),
  /** Secondary SNMP interface */
  SECONDARY: new OnmsPrimaryType('S', 'SECONDARY'),
  /** SNMP interface is not eligible for collection */
  NOT_ELIGIBLE: new OnmsPrimaryType('N', 'NOT_ELIGIBLE'),
};

/** @hidden */
const frozen = Object.freeze(PrimaryTypes);
export {frozen as PrimaryTypes};
