package cn.school.buy.service;

import java.util.List;

import cn.school.buy.po.Product;
import cn.school.buy.po.User;

/**
 * 
 * @ClassName:     ProductService.java
 * @Description:   商品的业务层 
 * 
 * @author         xujiacheng
 * @version        V1.0  
 * @Date           2017年3月13日 下午6:52:23
 */
public interface ProductService {
	//查询所有的商品
	public List<Product> selectAllProduct();
	//根据用户id查询用户所有的商品
	public List<Product>  selectProductsofUser(User user);
	//按商品的id查询商品信息
	Product findProductByProductId(Product product);
	//按商品类型查询商品
	public List<Product> selectProductByType(Product product);
	//保存商品信息
	public int saveProduct(Product product); 
	//关联查询用户信息
	List<Product> findALLProductCascadeUser();
	//按类别查询商品级联用户信息
	public List<Product> findProductByTypeCascadeUser(Product product);
	//根据主键将商品删除
	public int deleteByProductId(String productId);
	//根据主键更新宝贝
	public int updateProductById(Product product);
}
