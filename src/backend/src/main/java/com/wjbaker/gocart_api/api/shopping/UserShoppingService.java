package com.wjbaker.gocart_api.api.shopping;

import com.wjbaker.gocart_api.api.shopping.mapper.GetUserProductsMapper;
import com.wjbaker.gocart_api.api.shopping.type.GetUserProductsResponse;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.data.repository.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public final class UserShoppingService {

    private final ShoppingRepository shoppingRepository;

    @Autowired
    public UserShoppingService(final ShoppingRepository shoppingRepository) {
        this.shoppingRepository = shoppingRepository;
    }

    public GetUserProductsResponse GetUserProducts(final UserEntity user) {
        var products = this.shoppingRepository.findByUser(user);

        return GetUserProductsMapper.map(products);
    }
}
