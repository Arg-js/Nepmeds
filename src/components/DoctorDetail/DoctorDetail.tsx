import {
  Box,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NepmedsLogoIcon from "@nepMeds/assets/images/logo1.png";
import { AcademicInfo } from "@nepMeds/service/nepmeds-academic";
import { CertificateInfo } from "@nepMeds/service/nepmeds-certificate";
import { ExperienceInfo } from "@nepMeds/service/nepmeds-experience";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";

interface IUser {
  first_name: string;
  middle_name: string;
  last_name: string;
  mobile_number: number;
  email: string;
  gender: string;
  date_of_birth: string;
  province: string;
  district: string;
  municipality: string;
}
interface IDoctorDetails {
  user: IUser;
  image: string;
  bio_detail: string;
  age: number;
  gender: string;
  id_number: string;
  id_issued_date: string;
  id_issued_district: string;
  province: string;
  district: string;
  profile_status: string;
  no_of_rejected_times: number;
  rejected_remarks: string;
  specialization: string[];
  municipality_vdc: string;
  doctor_academic_info: AcademicInfo[];
  doctor_certification_info: CertificateInfo[];
  doctor_experience: ExperienceInfo[];
}

const DoctorDetail = ({
  image,
  user,

  bio_detail,
  id_number,
  id_issued_district,
  id_issued_date,

  specialization,

  profile_status,
  no_of_rejected_times,
  rejected_remarks,
  doctor_academic_info,
  doctor_certification_info,
  doctor_experience,
}: IDoctorDetails) => {
  const imageSrc = image ? `${normalURL}${image}` : NepmedsLogoIcon;
  return (
    <>
      <Flex gap={4} mb={18}>
        <Image
          src={imageSrc}
          alt="nepmeds logo"
          h={24}
          w={24}
          borderRadius="100%"
          objectFit="cover"
        />
        <Flex direction="column">
          <Text color={colors.primary_blue} fontWeight={600}>
            {user?.first_name} {user?.middle_name} {user?.last_name}
          </Text>

          <Text color={colors.dark_grey}>{bio_detail}</Text>
        </Flex>
      </Flex>

      <Text mb={3}>Basic Information</Text>

      <VStack gap={2} color={colors.dark_grey}>
        <SimpleGrid columns={3} gap={6} mb={18} w="100%">
          <Box>
            <p style={{ fontSize: "small" }}>Number</p>
            <p>{user?.mobile_number}</p>
          </Box>
          <Box>
            <p style={{ fontSize: "small" }}>Email</p>
            <p>{user?.email}</p>
          </Box>
          <Box>
            <p style={{ fontSize: "small" }}>Gender</p>
            <p>{user?.gender}</p>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={3} gap={6} mb={18} w="100%">
          <Box>
            <p style={{ fontSize: "small" }}>Date of birth</p>
            <p>{user?.date_of_birth}</p>
          </Box>
          <Box>
            <p style={{ fontSize: "small" }}>Specialization</p>
            <span>{specialization?.map(list => list.concat(", "))}</span>
          </Box>
        </SimpleGrid>
      </VStack>

      {profile_status === "rejected" && (
        <>
          <Divider my={4} />
          <SimpleGrid
            columns={2}
            gap={6}
            mb={18}
            color={colors.dark_grey}
            w="100%"
          >
            <Box>
              <p style={{ fontSize: "small" }}>No. of rejected times</p>
              <p>{no_of_rejected_times || 0}</p>
            </Box>

            <Box>
              <p style={{ fontSize: "small" }}>Rejected Remarks</p>
              <p>{rejected_remarks}</p>
            </Box>
          </SimpleGrid>
        </>
      )}
      <Divider my={4} />

      <Text mb={3}>Citizenship Details</Text>
      <SimpleGrid columns={3} gap={6} mb={18} color={colors.dark_grey} w="100%">
        <Box>
          <p style={{ fontSize: "small" }}>Citizenship Number</p>
          <p>{id_number}</p>
        </Box>

        <Box>
          <p style={{ fontSize: "small" }}>Issued District</p>
          <p>{id_issued_district}</p>
        </Box>

        <Box>
          <p style={{ fontSize: "small" }}>Issued Date</p>
          <p>{id_issued_date}</p>
        </Box>
      </SimpleGrid>
      <Divider my={4} />
      <Text mb={3}>Address Details</Text>
      <SimpleGrid columns={3} gap={6} mb={18} color={colors.dark_grey} w="100%">
        <Box>
          <p style={{ fontSize: "small" }}>Province</p>
          <p>{user?.province}</p>
        </Box>

        <Box>
          <p style={{ fontSize: "small" }}>District</p>
          <p>{user?.district}</p>
        </Box>

        <Box>
          <p style={{ fontSize: "small" }}>Municipality/ VDC</p>
          <p>{user?.municipality}</p>
        </Box>
      </SimpleGrid>
      <Divider my={4} />
      <Text mb={3}>Academic Details</Text>
      {doctor_academic_info?.map((academic_info: any, id: any) => {
        const fileURL = academic_info?.file
          ? `${normalURL}${academic_info?.file}`
          : "";

        return (
          <div key={id}>
            <SimpleGrid
              columns={3}
              gap={6}
              mb={18}
              color={colors.dark_grey}
              w="100%"
            >
              <Box>
                <p style={{ fontSize: "small" }}>Degree Program</p>
                <p>{academic_info?.degree_program}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Graduation Year</p>
                <p>{academic_info?.graduation_year}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>University</p>
                <p>{academic_info?.university}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Major</p>
                <p>{academic_info?.major}</p>
              </Box>
            </SimpleGrid>

            <SimpleGrid
              columns={3}
              gap={6}
              mb={18}
              color={colors.dark_grey}
              w="100%"
            >
              <Box>
                <p style={{ fontSize: "small" }}>Documents</p>
                <a
                  href={fileURL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.primary }}
                >
                  {academic_info?.file?.split("/").pop()}
                </a>
              </Box>
            </SimpleGrid>
          </div>
        );
      })}
      <Divider my={4} />
      <Text mb={3}>Certificate Details</Text>
      {doctor_certification_info?.map((certification_info: any, id: any) => {
        const fileURL = certification_info?.file
          ? `${normalURL}${certification_info?.file}`
          : "";

        return (
          <div key={id}>
            <SimpleGrid
              columns={3}
              gap={6}
              mb={18}
              color={colors.dark_grey}
              w="100%"
            >
              <Box>
                <p style={{ fontSize: "small" }}>Title</p>
                <p>{certification_info?.title}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Issued By</p>
                <p>{certification_info?.issued_by}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Certificate Number</p>
                <p>{certification_info?.certificate_number}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Certificate Issued Date</p>
                <p>{certification_info?.certificate_issued_date}</p>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={3} gap={6} mb={18} w="100%">
              <Box>
                <p style={{ fontSize: "small" }}>Documents</p>
                <a
                  href={fileURL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.primary }}
                >
                  {certification_info?.file?.split("/").pop()}
                </a>
              </Box>
            </SimpleGrid>
          </div>
        );
      })}
      <Divider my={4} />
      <Text mb={3}>Experience Details</Text>
      {doctor_experience?.map((experience_info: any, id: any) => {
        const fileURL = experience_info?.file
          ? `${normalURL}${experience_info?.file}`
          : "";

        return (
          <div key={id}>
            <SimpleGrid columns={3} gap={6} mb={18} w="100%">
              <Box>
                <p style={{ fontSize: "small" }}>Hospital</p>
                <p>{experience_info?.hospital}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>Currently Working</p>
                <p>{experience_info?.currently_working || "----"}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}> Start Date</p>
                <p>{experience_info?.from_date}</p>
              </Box>

              <Box>
                <p style={{ fontSize: "small" }}>End Date</p>
                <p>{experience_info?.to_date}</p>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={3} gap={6} mb={18} w="100%">
              <Box>
                <p style={{ fontSize: "small" }}>Description</p>
                <p>{experience_info?.description}</p>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={3} gap={6} mb={18} w="100%">
              <Box>
                <p style={{ fontSize: "small" }}>Documents</p>
                <a
                  href={fileURL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.primary }}
                >
                  {experience_info?.file?.split("/").pop()}
                </a>
              </Box>
            </SimpleGrid>
          </div>
        );
      })}
    </>
  );
};

export default DoctorDetail;
