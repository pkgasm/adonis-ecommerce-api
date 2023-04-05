import {
    column,
    BaseModel,
    belongsTo,
    BelongsTo,
    beforeCreate
} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import { v1 as uuidv1 } from "uuid";

import Category from 'App/Models/Category';
import Product from 'App/Models/Product';

export default class CategoryProduct extends BaseModel {
    @column({
        isPrimary: true,
        consume: (_value, _attribute, model) => _value || model.$getAttribute('id')
    })
    public id: string

    @column({ serializeAs: 'categoryId' })
    public categoryId: string

    @column({ serializeAs: 'productId' })
    public productId: string

    @column.dateTime({
        autoCreate: true,
        serializeAs: 'createdAt',
        serialize: (value: DateTime) => {
            return value.setZone('utc').toISO()
        },
    })
    public createdAt: DateTime

    @column.dateTime({
        autoCreate: true,
        autoUpdate: true,
        serializeAs: 'updatedAt',
        serialize: (value: DateTime) => {
            return value.setZone('utc').toISO()
        },
    })
    public updatedAt: DateTime

    @beforeCreate()
    public static async assignId(categoryProduct: CategoryProduct) {
        if (!categoryProduct.id) {
            categoryProduct.id = uuidv1()
        }
    }

    @belongsTo(() => Category)
    public category: BelongsTo<typeof Category>

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>
}