module.exports = class TescoProductBuilder {

    /**
     *
     * Maps the response model from the Tesco API to our own object. This is due
     * to some of the properties having inconsistent naming conventions.
     *
     * @param {object} tescoProductResponse Response model from the Tesco API.
     */
    static fromResponse(tescoProductResponse) {
        // Deconstruct the object, creating variables for any of the properties
        // that we want to property name to change with '...rest' being the
        // remaining properties that we leave alone
        const {
            ContentsMeasureType: contentsMeasureType,
            UnitOfSale: unitOfSale,
            AverageSellingUnitWeight: averageSellingUnitWeight,
            UnitQuantity: unitQuantity,
            ContentsQuantity: contentsQuantity,
            unitprice: unitPrice,
            description: description,
            id: tpnc,

            ...rest
        } = tescoProductResponse;

        // Reconstruct the object with new property names
        // Also, create a single string from the list of descriptions
        return {
            contentsMeasureType,
            unitOfSale,
            averageSellingUnitWeight,
            description: description.join('\n'),
            unitQuantity,
            contentsQuantity,
            unitPrice,
            tpnc,

            ...rest
        }
    }
}