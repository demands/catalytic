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
  const typesById = indexBy(options.types, 'id')

  options.types.forEach(t => {
    assert(t.id, `Type provided without an id`)
    assert(t.qty, `Type ${t.id} does not have an associated qty`)
    assert(typeof t.qty === 'number', `Type ${t.id} has an associated qty that is not numeric (${JSON.stringify(t.qty)})`)
  })


  return {
    convertTo: function(count, typeId) {
      const type = typesById[typeId]
      return div(count, type.qty)
    },

    strConvertTo: function(count, typeId) {
      const type = typesById[typeId]
      const value = div(count, type.qty)
      return `${value} x ${type.name}`
    },

    convertFrom: function(count, typeId) {
      const type = typesById[typeId]
      return mult(count, type.qty)
    },

    strConvertFrom: function(count, typeId) {
      const type = typesById[typeId]
      const value = mult(count, type.qty)
      return `${value} x ${options.baseUnitName}`
    }
  }
}

converter.convertFromUnitQty = convertFromUnitQty
converter.convertToUnitQty = convertToUnitQty
