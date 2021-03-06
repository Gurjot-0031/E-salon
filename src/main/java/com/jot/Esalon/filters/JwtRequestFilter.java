//package com.jot.Esalon.filters;
//
//import com.jot.Esalon.services.MyUserDetailsService;
//import com.jot.Esalon.util.JwtUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//public class JwtRequestFilter extends OncePerRequestFilter {
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private MyUserDetailsService myUserDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
//        final String authorizationHeader = httpServletRequest.getHeader("Authorization");
//        String username = null;
//        String jwt = null;
//        if(authorizationHeader!=null && authorizationHeader.startsWith("Bearer ")){
//            jwt = authorizationHeader.substring(7);
//            username = jwtUtil.extractUsername(jwt);
//        }
//        if(username!=null && SecurityContextHolder.getContext().getAuthentication() == null){
//            UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
//            if(jwtUtil.validateToken(jwt,userDetails)){
//                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
//                SecurityContextHolder.getContext().setAuthentication(token);
//            }
//        }
//        filterChain.doFilter(httpServletRequest,httpServletResponse);
//    }
//}
