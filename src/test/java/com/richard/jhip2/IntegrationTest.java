package com.richard.jhip2;

import com.richard.jhip2.JHipV2App;
import com.richard.jhip2.RedisTestContainerExtension;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = JHipV2App.class)
@ExtendWith(RedisTestContainerExtension.class)
public @interface IntegrationTest {
}
