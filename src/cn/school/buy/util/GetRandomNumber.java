package cn.school.buy.util;

import java.util.Random;

public class GetRandomNumber {
	public static String getRandom() {
		Random random = new Random();
		return String.valueOf(000000 + random.nextInt(1000000));  
	}
}
