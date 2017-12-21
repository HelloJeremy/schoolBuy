package cn.school.buy.mapper;

import cn.school.buy.po.Product;
import cn.school.buy.po.ProductExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ProductMapper {
    int countByExample(ProductExample example);

    int deleteByExample(ProductExample example);

    int deleteByPrimaryKey(String productid);

    int insert(Product record);

    int insertSelective(Product record);

    List<Product> selectByExample(ProductExample example);
    List<Product> selectALLProduct();
    //查询所有的商品级联用户信息
    List<Product> findALLProductCascadeUser();
    //按类别查询商品级联用户信息
    List<Product> findProductOfTypeCascadeUser(Product product);
    //根据商品id查询商品的详情
    Product findProductByProductId(Product product);

    Product selectByPrimaryKey(String productid);

    int updateByExampleSelective(@Param("record") Product record, @Param("example") ProductExample example);

    int updateByExample(@Param("record") Product record, @Param("example") ProductExample example);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);
}