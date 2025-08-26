import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Globe, Smartphone, Zap, TrendingUp } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-6 py-12 bg-gradient-to-b from-primary-50 to-white">
          <Text className="text-4xl font-bold text-center text-gray-900 mb-4">
            Digital Linked
          </Text>
          <Text className="text-xl text-primary-600 text-center font-semibold mb-6">
            Your Strategic Partner for Digital Success
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-8 leading-6">
            We craft stunning websites, build innovative apps, implement intelligent AI automation, 
            and drive impactful marketing strategies to grow your business.
          </Text>
          
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity className="bg-primary-600 px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold text-center">Instant Quote</Text>
            </TouchableOpacity>
            <Link href="/contact" asChild>
              <TouchableOpacity className="border border-primary-600 px-6 py-3 rounded-lg">
                <Text className="text-primary-600 font-semibold text-center">Contact Us</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Services Section */}
        <View className="px-6 py-12">
          <Text className="text-3xl font-bold text-center text-gray-900 mb-4">
            Our Core Services
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-12">
            We offer a comprehensive suite of digital services designed to elevate your brand 
            and accelerate your growth in the digital landscape.
          </Text>
          
          <View className="space-y-6">
            {[
              {
                title: "Website Development",
                description: "Crafting responsive, high-performance websites that captivate and convert visitors.",
                icon: Globe,
                color: "text-blue-600",
              },
              {
                title: "App Development",
                description: "Building intuitive and scalable mobile & web applications tailored to your needs.",
                icon: Smartphone,
                color: "text-green-600",
              },
              {
                title: "AI Automation",
                description: "Leveraging artificial intelligence to streamline processes and unlock new efficiencies.",
                icon: Zap,
                color: "text-yellow-600",
              },
              {
                title: "Digital Marketing",
                description: "Driving growth with data-driven marketing strategies across all digital channels.",
                icon: TrendingUp,
                color: "text-purple-600",
              },
            ].map((service, index) => (
              <View key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <View className="flex-row items-start space-x-4">
                  <View className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                    <service.icon size={24} className={service.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </Text>
                    <Text className="text-gray-600 leading-6">
                      {service.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-6 py-12 bg-primary-600">
          <Text className="text-3xl font-bold text-center text-white mb-4">
            Ready to Elevate Your Digital Presence?
          </Text>
          <Text className="text-lg text-white text-center mb-8 opacity-90">
            Let's discuss how Digital Linked can become your trusted partner in achieving your business objectives.
          </Text>
          
          <View className="flex-row justify-center space-x-4">
            <Link href="/contact?action=strategy-call" asChild>
              <TouchableOpacity className="bg-white px-6 py-3 rounded-lg">
                <Text className="text-primary-600 font-semibold text-center">Book a Free Strategy Call</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity className="border border-white px-6 py-3 rounded-lg">
              <Text className="text-white font-semibold text-center">Instant Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
