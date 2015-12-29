import BigNumber from 'bignumber.js'
import assert from 'assert'
import indexBy from 'lodash.indexby'

export default converter
module.exports = converter

function mult(a, b) {
  return new BigNumber(a).times(b).toNumber()
}

function div(a, b) {
  return new BigNumber(a).dividedBy(b).toNumber()
}

function convertFromUnitQty({count, unitQty}) {
  return div(count, unitQty)
}

function convertToUnitQty({count, unitQty}) {
  return mult(count, unitQty)
}

function converter(options) {
  options.types.forEach(t => {
    assert(t.id, `Type provided without an id`)
    assert(t.qty !== undefined, `Type ${t.id} does not have an associated qty`)
    assert(typeof t.qty === 'number', `Type ${t.id} has an associated qty that is not numeric (${JSON.stringify(t.qty)})`)
    assert(t.qty > 0, `Type ${t.id} has a qty that is not a positive number (${t.qty})`)
  })

  const typesById = indexBy(options.types, 'id')
  if (!typesById[undefined]) {
    typesById[undefined] = {
      id: undefined,
      qty: 1,
      name: options.baseUnitName
    }
  }

  function getType(typeId) {
    const type = typesById[typeId]
    if(type === undefined) { throw new Error(`${typeId} is not a valid type`) }
    return type
  }

  return {
    convertTo: function(count, typeId) {
      return div(count, getType(typeId).qty)
    },

    strConvertTo: function(count, typeId) {
      const type = getType(typeId)
      const value = div(count, type.qty)
      return `${value} x ${type.name}`
    },

    convertFrom: function(count, typeId) {
      return mult(count, getType(typeId).qty)
    },

    strConvertFrom: function(count, typeId) {
      const value = mult(count, getType(typeId).qty)
      return `${value} x ${options.baseUnitName}`
    }
  }
}

converter.convertFromUnitQty = convertFromUnitQty
converter.convertToUnitQty = convertToUnitQty
